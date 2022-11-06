// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "lib/forge-std/src/Test.sol";
import {console2} from "lib/forge-std/src/console2.sol";

import {IERC20} from "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {Communicator} from "../contracts/Communicator.sol";

import {noERC20} from "./tokens/noERC20.sol";
import {InoERC20} from "./tokens/InoERC20.sol";

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
