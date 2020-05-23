---
title: Account is temporary and permanent
date: 2019-07-21
publishdate: 2019-07-21
---

Welcome to this week's ngWeekly.

Do you like our new logo?

![NGIN](/ngweekly/NG.min.svg "NGIN")

As mentioned above, we need to talk about the model of the account in the ngin network this week.

#### Account's content

As we said in the last few weeks, we will need to store all the data in the network in the account, so in our design, most of the content is stored in `[]byte` format, in order to ensure scalability, except The original content of this account is kept lean.

So the account model has only five fields, **ID**, **Balance**, **Owner**, **Nonce**, and **SubState**.

**SubState** is what was previously said to store persistent storage and to ensure that the entire blockchain network is expandable.

The design of the **ID** was originally intended to be an incremental number starting with 0 as an account - obviously this is easier to remember, and the earlier shorter accounts are more valuable. But recently we decided to abandon this solution in the new blockchain anonymity feature implementation, because in order to ensure the user's anonymity, the account needs to be abandoned after use, rather than holding it as an investment product. But also considering the readability, we still maintain the readability of the account, that is, the pure digital composition, of course, if you want to remember with letters, we also have a built-in conversion tool. In the current default settings, the account is a pure number of uint32, obtained from the corresponding block of the Vault by crc32 (IEEE).

**Balance**, as literally, is the disposable balance in the account.

The **Owner** stores the corresponding public key, and a public key can have multiple accounts at the same time.

**Nonce** is how we solve the double spend. The balanceSheet will only accept operations that are higher than the account number Nonce. Each operation submission will have a Nonce field, the default is the current account Nonce+1. This means that the same transaction is sent twice, and the second time is considered to be Nonce lower than the account Nonce and rejected. The specific Nonce also has a way of using it on Operation. Let's talk about it in August.

#### Account's life cycle

As mentioned above, although we want the account to be more readable and memorable, we also hope that the account will not be used as an investment product, because the account represents the storage space on the NGIN block, we hope that the storage space of each node is Valuable use.

So we designed to clean up the valueless Account at the time of a vault. The temporary definition of the valueless Account here is 0 balance. In other words, if you need to save data in the NGIN network, you must have an NGIN in your account.

The Account generation is also performed after the Vault cleans up the valueless Account. By default, the bonus of the Block on the Checkpoint will be automatically assigned to the Account, which means that the account is permanently held. Of course, if you transfer all the balance accounts, they will be automatically destroyed.

However, since one Vault is generated for every six blocks, if the mining node digs a block without an account, how to calculate the reward in the block? We have a k-v table called FrozenRoom in BalanceSheet, which records the mining public key and the unpaid reward. The reason why it is called FrozenRoom is that because there is no account, it is impossible to initiate a transaction, and all funds are equivalent to being frozen. As long as the public key is used to dig into a vault to obtain an account, all outstanding rewards will be automatically transferred to the new account.

Therefore, NGIN's blockchain environment is different from all the blockchains on the market. We have spent a lot of thought on design. Next NGIN Weekly, we started talking about Operation.
