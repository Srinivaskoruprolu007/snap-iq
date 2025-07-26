export default {
  providers: [
    {
      // This domain is from the NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
      // which is in the format pk_test_<domain>
      domain: process.env.NEXT_PUBLIC_CLERK_ACCOUNTS_URL,
      applicationID: "convex",
    },
  ],
};
