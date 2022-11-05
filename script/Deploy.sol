// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Communicator} from "../contracts/Communicator.sol";
import {UserDeposit} from "../contracts/UserDeposit.sol";
import {ProtocolConnector} from "../contracts/ProtocolConnector.sol";

import {noERC20} from "../contracts/tokens/noERC20.sol";

contract ConnectorDeploy {
    ProtocolConnector connector;
    Communicator communicator;
    noERC20 goldfinch;

    function connectorDeploy(uint16 _chainId, uint16 _masterChainId)
        internal
        returns (
            address,
            address,
            address
        )
    {
        connector = new ProtocolConnector();
        communicator = new Communicator();
        atlendis = new noERC20(address(connector), "atlendis USDC", "aUSDC");

        connector.initialize(address(atlendis), address(communicator));

        return (address(communicator), address(connector), address(goldfinch));
    }
}

contract UserDepositDeploy {
    Communicator communicator;
    UserDeposit userDeposit;
    noERC20 usdc;

    function userDepositDeploy(uint16 _chainId, uint16 _masterChainId)
        internal
        returns (
            address,
            address,
            address
        )
    {
        communicator = new Communicator();
        userDeposit = new UserDeposit();
        usdc = new noERC20(address(userDeposit), "fake USDC", "fUSDC");
        userDeposit.initialize(address(usdc), address(communicator));

        return (address(communicator), address(userDeposit), address(usdc));
    }
}
