pragma solidity ^0.7.4; // See "Solidity version" of README.md


/**
 * @title General purpose "Address to String" code
 * @author Ville Sundell <development@solarius.fi>
 * @dev This is a library that can be used by any contract to convert
 * `address` to `string`. Primarily designed for Oracle's Client Smart
 * Contracts.
 *
 * The resulting `string` intentionally lacks `0x` prefix, because it would be
 * redundant: the address is known to be an Ethereum account address.
 */
library AddressLibrary {

    /**
     * @dev This is a function that can be used by any contract to convert
     * `address` to `string`. Primarily designed for Oracle's Client Smart
     * Contracts.
     *
     * The resulting `string` intentionally lacks `0x` prefix, because it
     * would be redundant: the address is known to be an Ethereum account
     * address.
     *
     * @param addr `address` to be converted to `string`
     * @return str The resulting string. Intentionally without `0x` prefix,
     * because it would be redundant: the address is known to be an Ethereum
     * account address
     */
    function toString(address addr) internal pure returns (string memory str) {
        bytes memory hexadecimals = "0123456789ABCDEF";
        bytes memory source = abi.encodePacked(addr);
        bytes memory tmp = new bytes(40);

        for (uint256 i = 0; i < 20; i++) {
            tmp[i*2] = hexadecimals[uint8(source[i] >> 4)];
            tmp[1+i*2] = hexadecimals[uint8(source[i] & 0x0F)];
        }

        return string(tmp);
    }
}