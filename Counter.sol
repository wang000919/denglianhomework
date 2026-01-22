// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Counter {
    uint public counter;
    function add(uint x) external{
        counter = counter + x;
    }
}