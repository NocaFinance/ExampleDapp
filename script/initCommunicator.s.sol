// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "lib/forge-std/src/Script.sol";
import "./Config.sol";
import "./Getter.sol";
import {Communicator} from "../contracts/Communicator.sol";
import {console2} from "lib/forge-std/src/console2.sol";

contract InitCommunicator is Config, Getter {
    Communicator communicator;
    address linked;

    function run() public {
        init();
        uint256 chainId = vm.envUint("CHAINID");
        communicator = Communicator(
            getContractAddress(chainId, "communicator")
        );

        console2.logAddress(getContractAddress(chainId, "communicator"));

        // todo check whether we are on master chain or not
        if (chainId == 1) {
            linked = getContractAddress(chainId, "connector");
        } else {
            linked = getContractAddress(chainId, "userDeposit");
        }
        getCommunicatorModuleAddresses();

        console2.logUint(123456789);
        console2.logUint(communicatorAddresses.length);
        vm.startBroadcast();

        communicator.initialize(
            uint16(chainId),
            masterChainId,
            linked,
            hypOutbox[uint16(chainId) - 1], // outbox on the respective chain
            hypDomainIdentifier, // domains per chain
            communicatorAddresses
        );
        vm.stopBroadcast();
        console2.logString("leeeeeength");
        console2.logUint(uint16(chainId));
        console2.logUint(masterChainId);
        console2.logString("linked");

        console2.logAddress(linked);

        console2.logString("leeeeeength");

        console2.logUint(hypDomainIdentifier.length);
        console2.logUint(communicatorAddresses.length);
    }
}
