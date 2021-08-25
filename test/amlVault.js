const AmlVault = artifacts.require("./AmlVault");
const MocOracle = artifacts.require("./test/MockETHAtomicOracle");
const MockMoc = artifacts.require("./test/MockMoC");
const { expectRevert, constants } = require('@openzeppelin/test-helpers');
const defaultFee = '500';
const defaultStatusFlag = '0x0000000000000000000000000000000000000000000000000000000000000000';
const cleanStatusFlag = '0x0000000000000000000000000000000000000000000000000000000000000021';
const allFlagsOn = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0063'
const { ZERO_ADDRESS } = constants;


contract("AmlVault", async accounts => {
  beforeEach(async function () {
    this.mockETHAtomicOracle = await MocOracle.new(defaultFee);
    this.mockMoC = await MockMoc.new();
    this.guardian = accounts[0];
    this.amlVault = await AmlVault.new(this.mockETHAtomicOracle.address, this.mockMoC.address, defaultStatusFlag, cleanStatusFlag, { from: this.guardian });
  });
  describe('validate user', function () {

    it('validate user with default status flag', async function () {
      await this.mockETHAtomicOracle.setMockStatus(defaultStatusFlag);
      await this.amlVault.validateUser(accounts[1], { from: accounts[1], value: defaultFee });
    });
    it('validate user with clean flag', async function () {
      await this.mockETHAtomicOracle.setMockStatus(cleanStatusFlag);
      await this.amlVault.validateUser(accounts[1], { from: accounts[1], value: defaultFee });
    });
    it('reverts when addres is blacklisted', async function () {
      await this.mockETHAtomicOracle.setMockStatus(allFlagsOn);

      await expectRevert(
        this.amlVault.validateUser(accounts[1], { from: accounts[1], value: defaultFee }),
        'AmlVault: User is sanctioned',
      );
    });
  });

  describe('mint DOC', function () {

    it('mint valid user with default status flag', async function () {
      await this.mockETHAtomicOracle.setMockStatus(defaultStatusFlag);
      await this.amlVault.mintDoc('10', { from: accounts[1], value: defaultFee });
    });
    it('mint valid user with clean flag', async function () {
      await this.mockETHAtomicOracle.setMockStatus(cleanStatusFlag);
      await this.amlVault.mintDoc('20', { from: accounts[1], value: defaultFee });
    });
    it('reverts when mint with user in blacklisted', async function () {
      await this.mockETHAtomicOracle.setMockStatus(allFlagsOn);

      await expectRevert(
        this.amlVault.mintDoc('15', { from: accounts[1], value: defaultFee }),
        'AmlVault: User is sanctioned',
      );
    });
  });
  describe('redeem DOC', function () {

    it('mint valid user with default status flag', async function () {
      await this.mockETHAtomicOracle.setMockStatus(defaultStatusFlag);
      await this.amlVault.mintDoc('10', { from: accounts[1], value: defaultFee });
      await this.amlVault.redeemFreeDoc('10', { from: accounts[1], value: defaultFee });
    });
    it('mint valid user with clean flag', async function () {
      await this.mockETHAtomicOracle.setMockStatus(cleanStatusFlag);
      await this.amlVault.mintDoc('20', { from: accounts[1], value: defaultFee });
      await this.amlVault.redeemFreeDoc('20', { from: accounts[1], value: defaultFee });
    });
    it('reverts when mint with user in blacklisted', async function () {
      await this.mockETHAtomicOracle.setMockStatus(allFlagsOn);

      await expectRevert(
        this.amlVault.redeemFreeDoc('15', { from: accounts[1], value: defaultFee }),
        'AmlVault: User is sanctioned',
      );
    });
  });

  describe('Config', function () {

    it('set new MoC', async function () {
      await this.amlVault.setMoC(accounts[1], { from: this.guardian });
    });
    it('set new oracle', async function () {
      await this.amlVault.setOracle(accounts[1], { from: this.guardian });
    });
    it('reverts when not guardian set new oracle', async function () {
      await expectRevert(
        this.amlVault.setOracle(accounts[1], { from: accounts[1] }),
        'AML: only guardian may set the oracle',
      );
    });
    it('reverts when not guardian set new MoC', async function () {
      await expectRevert(
        this.amlVault.setMoC(accounts[1], { from: accounts[1] }),
        'AML: only guardian may set the MoC',
      );
    });
    it('reverts when not guardian set new MoC', async function () {
      await expectRevert(
        this.amlVault.setMoC(accounts[1], { from: accounts[1] }),
        'AML: only guardian may set the MoC',
      );
    });
    it.only('reverts when addres of new MoC is zero ', async function () {
      await expectRevert(
        this.amlVault.setMoC(ZERO_ADDRESS, { from: this.guardian }),
        'AML: address MoC can not be 0',
      );
    });
    it.only('reverts when addres of new oracle is zero ', async function () {
      await expectRevert(
        this.amlVault.setOracle(ZERO_ADDRESS, { from: this.guardian }),
        'AML: address oreacle can not be 0',
      );
    });
  });
});