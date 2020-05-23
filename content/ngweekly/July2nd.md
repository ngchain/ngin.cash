---
title: What is the Vault 
date: 2019-07-13
publishdate: 2019-07-14
---

Hello everyone, this is NGIN Weekly.

![NGIN](/ngweekly/engine_pic.jpg "Engine")

#### balanceSheet is not balance sheet

Last week, we briefly introduced the vault architecture we introduced in ngWeekly. Just like the literal meaning, it is the existence of a safe to ensure the security of funds in the main chain.

Today we will explain the important thing locked in the vault - **balanceSheet**.

The balanceSheet is a k-v pool that runs and automatically updates the account instances among nodes as the transaction pool storing the txs.

And, the vault packs it when block reaches checkpoint.
This balanceSheet has similarities and differences in the balance sheet in the accounting profession.

!["balance sheet"](/ngweekly/balance_sheet.png "balance sheet")

#### Vault doesn't have any txs => keep chain light

First, the transaction content is not recorded in the balanceSheet in ngin, different from the accounting balance sheet. Assuming that the transaction is recorded, the ngin node will be occupied by a bunch of historical transaction content just like bitcoin.

So we keep the transactions in the block, which we defined can be deleted, and in order to correspond to the transaction, we hook each vault to a checkpoint block, which means that the balanceSheet corresponds to the time point corresponding to the block.

After the balanceSheet transaction information is placed in the block transaction, we only need to save the balance information of each account, like the accounting balance sheet does.  

But considering the scalability of the entire system, we not only need to save the content of the balance, we also introduced the subState field to store the data.  This part is stored as permanent.

This part of the permanent storage can be used as a smart contract, can construct layer-2, and can save your private data, or you can express some declarations in plain text.

You only need to ensure that your account is not recycled by the network, and this space will always be yours.

#### hash(Vault) == hash(balanceSheet) => keep chain safe

!["vaults"](/ngweekly/vaults.jpg "vaults")

Since there is a field **prevVaultHash** in the block structure, that corresponds to the hash of the previous vault, the hash is obtained by sorting all the accounts of the balanceSheet, serializing and then calculating the hash value.

Therefore, all nodes can guarantee the consistency of the vault and the data in it through the transmission of the block, without additional data transmission. As we said last week, the same new node only needs two vaults and their corresponding 12 blocks after accessing the network.

And since it is easy to accumulate the total circulation at the current block height, in the process of hashing the balanceSheet (equivalent to the vault hash), it is a review of the transactions in the previous 6 blocks, and all previous transactions can be successfully guaranteed.

In other words, a vault generation is a sufficient condition for a mature transaction.  It is tentative that the block time is 10s, and 6 blocks form a vault, which means that the transaction only takes 1 minute to confirm.

#### Next

So it's obvious that the ngin node storage space usage is very sensitive to the number of accounts, and next week we will explain some of the account's design.

Then I will talk about some sensitive double-spending and other issues.
