// import { getContractWithSigner } from '@/app/contracts/contract';

// interface InitiateDisputeParams {
//   transactionId: number;
// }

// interface ResolveDisputeParams {
//   transactionId: number;
//   sellerWins: boolean;
// }

// interface AutoResolveDisputeParams {
//   transactionId: number;
// }

// export const disputeService = {
//   initiateDispute: async ({
//     transactionId
//   }: InitiateDisputeParams) => {
//     const contract = await getContractWithSigner();
//     return contract.initiateDispute(transactionId);
//   },

//   resolveDispute: async ({
//     transactionId,
//     sellerWins
//   }: ResolveDisputeParams) => {
//     const contract = await getContractWithSigner();
//     return contract.resolveDispute(transactionId, sellerWins);
//   },

//   autoResolveDispute: async ({
//     transactionId
//   }: AutoResolveDisputeParams) => {
//     const contract = await getContractWithSigner();
//     return contract.autoResolveDispute(transactionId);
//   },

//   // Get dispute timeout duration
//   getDisputeTimeout: async () => {
//     const contract = await getContractWithSigner();
//     return contract.DISPUTE_TIMEOUT();
//   }
// };

// export type DisputeService = typeof disputeService;