// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "lib/forge-std/src/Test.sol";

import {noERC20} from "./tokens/noERC20.sol";
//import {IERC20} from "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {Communicator} from "../contracts/Communicator.sol";

// functions
// user to deposit funds
// withdraw funds
// batch deploy funds

contract UserDeposit {
    // address userEOA =payable(address(0x059D495F1ffB46927Aa1664F71Ee9111C9E50ed8)); // Js priv address

    Communicator communicator;
    noERC20 usdc;

    modifier onlyCommunicator() {
        require(
            msg.sender == address(communicator),
            "Only communicator allowed."
        );
        _;
    }

    function initialize(address _usdc, address _communicator) public {
        communicator = Communicator(_communicator);
        usdc = noERC20(_usdc);
    }

    function initAccount() public {
        usdc.mint(msg.sender, 100 ether);
    }

    function depositFunds(uint256 amount) public {
        require(
            usdc.balanceOf(msg.sender) >= amount,
            "User does not have enough funds."
        );
        usdc.burn(msg.sender, amount);
        communicator.depositFunds(msg.sender, amount);
    }

    function withdrawFunds(uint256 amount) public {
        communicator.withdrawFunds(msg.sender, amount);
    }

    function releaseFunds(address sender, uint256 amount)
        public
        onlyCommunicator
    {
        usdc.mint(sender, amount);
    }

    //fallback() external payable {}
}
