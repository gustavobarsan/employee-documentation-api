// export interface EmployeeDocumentQueryPort {
//   getDocumentStatusByEmployeeId(
//     employeeId: string
//   ): Promise<{
//     employee: {
//       id: string;
//       name: string;
//     };
//     documents: Array<{
//       documentTypeId: string;
//       documentTypeName: string;
//       status: 'PENDING' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';
//       submittedAt?: Date;
//       expiresAt?: Date;
//     }>;
//   }>;
// }