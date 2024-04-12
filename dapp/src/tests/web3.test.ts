import { expect, test } from 'vitest'
import { Web3Utils } from '../utils/web3utils';

test('init without provider', () => {
    const web3: Web3Utils = new Web3Utils(undefined)
    expect(web3.initialize()).toBe(false)
})