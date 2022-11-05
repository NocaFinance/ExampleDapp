// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import {UserDeposit} from "./UserDeposit.sol";
import {ProtocolConnector} from "./ProtocolConnector.sol";
import {console2} from "lib/forge-std/src/console2.sol";

interface IOutbox {
    function dispatch(
        uint32 _destinationDomain,
        bytes32 _recipientAddress,
        bytes calldata _messageBody
    ) external returns (uint256);
}

interface IMessageRecipient {
    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata _messageBody
    ) external;
}

contract Communicator is IMessageRecipient {
    uint16 chainId;
    uint16 masterChainId;
    address linkedAddress;
    address hypOutbox;
    uint32[] hypDomainIdentifier;
    address[] public dstCommunicators;

    function initialize(
        uint16 _chainId,
        uint16 _masterChainId,
        address _linkedAddress,
        address _hypOutbox,
        uint32[] memory _hypDomainIdentifier,
        address[] memory _dstCommunicators
    ) public {
        console2.log(_chainId);
        console2.log(_masterChainId);
        // console2.log(_satelliteAddress);

        chainId = _chainId;
        masterChainId = _masterChainId;
        hypOutbox = _hypOutbox;
        hypDomainIdentifier = _hypDomainIdentifier;
        dstCommunicators = _dstCommunicators;

        linkedAddress = _linkedAddress;
    }

    // alignment preserving cast
    function _addressToBytes32(address _addr) internal pure returns (bytes32) {
        return bytes32(uint256(uint160(_addr)));
    }

    function depositFunds(address user, uint256 amount) public {
        _sendHyperlane(user, amount, "deposit", 1); // we always send to the chain deployed on 1
    }

    function depositFunds() public {
        ProtocolConnector(linkedAddress).depositFunds(msg.sender, 10);
    }

    function withdrawFunds(address user, uint256 amount) public {
        _sendHyperlane(user, amount, "withdraw", 1);
    }

    function releaseFunds(
        address user,
        uint256 amount,
        uint16 originChainId
    ) public {
        _sendHyperlane(user, amount, "release", originChainId);
    }

    function _sendHyperlane(
        address sender,
        uint256 amount,
        string memory fct,
        uint16 _dstChainId
    ) internal {
        console2.logAddress(hypOutbox);

        IOutbox(hypOutbox).dispatch{gas: 1000000}(
            hypDomainIdentifier[_dstChainId - 1],
            _addressToBytes32(dstCommunicators[_dstChainId - 1]), // address of the destination chain satellite
            abi.encode(fct, sender, amount, chainId)
        );
    }

    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata _messageBody
    ) external {
        (
            string memory fct,
            address sender,
            uint256 amount,
            uint16 originChainId
        ) = abi.decode(_messageBody, (string, address, uint256, uint16));
        if (keccak256(bytes(fct)) == keccak256(bytes("deposit"))) {
            ProtocolConnector(linkedAddress).depositFunds(sender, amount);
        } else if (keccak256(bytes(fct)) == keccak256(bytes("withdraw"))) {
            ProtocolConnector(linkedAddress).withdrawFunds(
                sender,
                amount,
                originChainId
            );
        } else if (keccak256(bytes(fct)) == keccak256(bytes("release"))) {
            UserDeposit(linkedAddress).releaseFunds(sender, amount);
        }
    }
}
