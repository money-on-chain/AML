pragma solidity ^0.7.4; // See "Solidity version" of README.md


/**
 * @title A library for handling statuses returned by Atomic Oracles
 * @author Ville Sundell <development@solarius.fi>
 * @dev Handling of the status flags is delegated to the client smart contract
 * by this library: the interpretation logic of the status flags will probably
 * change in the future, so it makes sense to outsource to the Client Smart
 * Contract instead of the Oracle itself.
 *
 * Making everything `internal` also embeddeds the code to the Client Smart
 * Contract, resulting in gas savings.
 */
library StatusLibrary {
    uint8 internal constant SANCTIONED_FLAG = 0;
    uint8 internal constant HACKER_FLAG = 1;
    uint8 internal constant TERRORIST_FLAG = 2;
    uint8 internal constant MIXER_FLAG = 3;
    uint8 internal constant PROXIMITY_FLAG = 4;
    uint8 internal constant RANSOMWARE_FLAG = 5;
    uint8 internal constant INTELECTUAL_PIRACY_FLAG = 6;

    /**
     * @dev Check if a certain flag of the returned status is set.
     *
     * @param status The returned status from an Oracle Smart Contract
     * @param flag Flag number to check, 0-255
     * @return isSet Returns `true` if the flag in question is set, `false`
     * otherwise
     */
    function isFlag(bytes32 status, uint8 flag) internal pure returns (bool isSet) {
        return (status & bytes32(2**flag)) > 0;
    }
}