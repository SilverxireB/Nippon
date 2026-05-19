# Security Specification - Trip Budget App

## Data Invariants
- A budget item must always have a valid `ownerId` matching the creator's UID.
- Users can only read and write their own budget items.
- `createdAt` is immutable after creation.
- `updatedAt` must be set to the server time on every write.

## The "Dirty Dozen" Payloads
1. **Identity Spoofing**: Attempt to create a budget item with an `ownerId` that is not the current user's UID.
2. **PII Leak**: Attempt to read the `users` collection or other users' `budgetItems`.
3. **State Poisoning**: Inject a 2MB string into the `description` field.
4. **Type Confusion**: Send a string for the `amount` field.
5. **Orphaned Write**: Attempt to write to a path outside `/users/{userId}/budgetItems/{itemId}`.
6. **Immutable Breach**: Attempt to update `createdAt` after the document is created.
7. **Future Splicing**: Attempt to set `updatedAt` to a client-side timestamp instead of the server time.
8. **Malicious Enum**: Setting `category` to a value not in the allowlist (e.g., "admin_access").
9. **Negative Amount**: Setting `amount` to a negative number to "refund" budget.
10. **Ghost Fields**: Adding extra fields like `isVerifiedAdmin: true` to a budget item.
11. **ID Injection**: Using a reserved character or ultra-long string as a document ID.
12. **Unauthorized Deletion**: A user attempting to delete another user's budget item.

## The Test Runner
A `firestore.rules.test.ts` will be implemented to verify these constraints.
