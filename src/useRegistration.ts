import { useQuery, gql } from "urql";

// TODO: figure out how to generate/extract types from this query

const RegistrationQuery = gql`
  query RegistrationQuery($name: String!) {
    registrations(where: { labelName: $name }, first: 1) {
      labelName
      registrationDate
      expiryDate
    }
  }
`;

export const useRegistration = (name: string) => {
  const isValid = name.length >= 3;

  const [result, reexecuteQuery] = useQuery({
    query: RegistrationQuery,
    variables: { name },
    pause: !isValid,
    requestPolicy: "network-only",
  });

  if (!isValid) {
    return { data: null, error: null, fetching: false, isRegistered: true };
  }

  const { data, error, fetching } = result;

  return {
    data,
    error,
    fetching,
    registration: data?.registrations[0],
    isRegistered: data ? data.registrations.length > 0 : null,
  };
};
