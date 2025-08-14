// import { AddBeneficiaryRequest, AddBeneficiaryResponse, DeleteBeneficiaryRequest, DeleteBeneficiaryResponse, GetAllUserBeneficiaryAccountRequest, GetAllUserBeneficiaryRequest, GetAllUserBeneficiaryResponse } from "../../../lib/home/home";
// import { emptySplitApi } from "../api";

// export const authApi = emptySplitApi.injectEndpoints({

//     endpoints: (builder) => ({
//         addBeneficiary: builder.mutation<AddBeneficiaryResponse, AddBeneficiaryRequest>({
//             query: (credentials) => ({
//                 method: 'POST',
//                 url: `User/Beneficiary/add_beneficiary`,
//                 body: credentials
//             }),
//             invalidatesTags: ['USER_BENEFICIARIES'],
//         }),

//         deleteBeneficiary: builder.mutation<DeleteBeneficiaryResponse, DeleteBeneficiaryRequest>({
//             query: (credentials) => ({
//                 method: 'POST',
//                 url: `User/Beneficiary/delete_beneficiary`,
//                 body: credentials,
//             }),
//             invalidatesTags: ['USER_BENEFICIARIES'],
//         }),

//         getUserBeneficiary: builder.query<GetAllUserBeneficiaryResponse, GetAllUserBeneficiaryRequest>({
//             query: (params) => ({
//                 url: "User/Beneficiary/get_all_beneficiaries_for_a_user",
//                 params
//             }),
//             providesTags: ['USER_BENEFICIARIES'],
//         }),

//         getUserBeneficiaryAccountNumber: builder.query<GetAllUserBeneficiaryResponse, GetAllUserBeneficiaryAccountRequest>({
//             query: (params) => ({
//                 url: "User/Beneficiary/get_beneficiary_by_account_number",
//                 params
//             }),
//             providesTags: ['USER_BENEFICIARIES'],
//         }),
//     })
// })

// export const { useAddBeneficiaryMutation, useDeleteBeneficiaryMutation, useGetUserBeneficiaryQuery, useGetUserBeneficiaryAccountNumberQuery } = authApi;