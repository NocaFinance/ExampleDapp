// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "lib/forge-std/src/Test.sol";
import {console2} from "lib/forge-std/src/console2.sol";

import {IERC20} from "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {Communicator} from "../contracts/Communicator.sol";

import {noERC20} from "./tokens/noERC20.sol";
import {InoERC20} from "./tokens/InoERC20.sol";
import {IPUSHCommInterface} from "./IPUSHCommInterface.sol";

contract ProtocolConnector {
    mapping(address => uint256) public usersId;
    mapping(uint256 => mapping(address => uint256)) public investedAPWine;
    uint256 public countUser;

    InoERC20 atlendis;

    Communicator communicator;

    function initialize(address _goldfinch, address _communicator) public {
        atlendis = InoERC20(_goldfinch);
        communicator = Communicator(_communicator);
    }

    modifier onlyCommunicator() {
        require(
            msg.sender == address(communicator),
            "Only communicator allowed."
        );
        _;
    }

    // deposits funds into the goldfinch protocol
    function depositFunds(address sender, uint256 amount) public {
        //onlyCommunicator
        atlendis.mint(sender, amount);
        IPUSHCommInterface(0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa)
            .sendNotification(
                0x3ebbd27BF7C1108c98554B2adF6f24F7CdF717C9, // from channel - recommended to set channel via dApp and put it's value -> then once contract is deployed, go back and add the contract address as delegate for your channel
                0x3ebbd27BF7C1108c98554B2adF6f24F7CdF717C9, // to recipient, put address(this) in case you want Broadcast or Subset. For Targetted put the address to which you want to send
                bytes(
                    string(
                        // We are passing identity here: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/identity/payload-identity-implementations
                        abi.encodePacked(
                            "0", // this is notification identity: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/identity/payload-identity-implementations
                            "+", // segregator
                            "3", // this is payload type: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/payload (1, 3 or 4) = (Broadcast, targetted or subset)
                            "+", // segregator
                            "Hi Justin", // this is notificaiton title
                            "+", // segregator
                            "We wanted to let you know that your money arrived safely. Thanks for using this service. " // notification body
                        )
                    )
                )
            );
    }

    function withdrawFunds(
        address sender,
        uint256 amount,
        uint16 originChainId
    ) public onlyCommunicator {
        require(
            atlendis.balanceOf(sender) >= amount,
            "User does not have enough funds."
        );

        atlendis.burn(sender, amount);
        communicator.releaseFunds(sender, amount, originChainId);
    }
}
