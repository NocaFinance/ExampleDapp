// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Config {
    uint16[] chainIds;

    uint32[] hypDomainIdentifier;
    mapping(uint16 => address) hypOutbox;

    uint16 masterChainId = 1;

    function init() internal {
        // Mumbai
        chainIds.push(1);
        hypDomainIdentifier.push(80001);
        hypOutbox[0] = 0xe17c37212d785760E8331D4A4395B17b34Ba8cDF;

        // Fuji
        chainIds.push(2);
        hypDomainIdentifier.push(43113);
        hypOutbox[1] = 0xc507A7c848b59469cC44A3653F8a582aa8BeC71E;

        // Moonbase
        // chainIds.push(3);
        // hypDomainIdentifier.push(0x6d6f2d61);
        // hypOutbox[2] = 0x54148470292C24345fb828B003461a9444414517;

        //Goerli
        chainIds.push(3);
        hypDomainIdentifier.push(420);
        hypOutbox[2] = 0x54148470292C24345fb828B003461a9444414517;
    }
}
