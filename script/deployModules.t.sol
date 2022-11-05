// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "lib/forge-std/src/Script.sol";
import {console2} from "lib/forge-std/src/console2.sol";
import {ConnectorDeploy, UserDepositDeploy} from "./Deploy.sol";

import "./Config.sol";

import "./Deploy.sol";

//import {Helpers} from "../../../src/helpers/Helpers.sol";

contract DeployConnector is Script, ConnectorDeploy {
    function run() public {
        uint256 chainId = vm.envUint("CHAINID");
        vm.startBroadcast();
        (
            address communicator,
            address connector,
            address goldfinch
        ) = connectorDeploy(uint16((chainId)), 1); // masterchain id
        vm.stopBroadcast();

        string[] memory inputs = new string[](16);
        inputs[0] = "node";
        inputs[1] = "script/helpers/writeToJson.js";
        inputs[2] = "deployTest.json";
        inputs[3] = vm.toString(chainId);
        inputs[4] = "connector";
        inputs[5] = vm.toString(connector);
        inputs[6] = "communicator";
        inputs[7] = vm.toString(communicator);
        inputs[8] = "goldfinch";
        inputs[9] = vm.toString(goldfinch);
        vm.ffi(inputs);
    }
}

contract DeployUserDeposit is Script, UserDepositDeploy {
    function run() public {
        uint256 chainId = vm.envUint("CHAINID");
        vm.startBroadcast();
        (address communicator, address userDeposit, address usdc) = userDepositDeploy(
            uint16(chainId),
            1 // masterchain id
        );
        vm.stopBroadcast();

        string[] memory inputs = new string[](10);
        inputs[0] = "node";
        inputs[1] = "script/helpers/writeToJson.js";
        inputs[2] = "deployTest.json";
        inputs[3] = vm.toString(chainId);
        inputs[4] = "userDeposit";
        inputs[5] = vm.toString(userDeposit);
        inputs[6] = "communicator";
        inputs[7] = vm.toString(communicator);
        inputs[8] = "usdc";
        inputs[9] = vm.toString(usdc);

        vm.ffi(inputs);
    }
}
