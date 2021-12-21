import { useQuery, gql } from "urql";

// TODO: figure out how to generate/extract types from this query

const RegistrationQuery = gql`
  query RegistrationQuery($name: String!) {
    registrations(where: { labelName: $name }, first: 1) {
      domain {
        name
      }
    }
  }
`;

export const useRegistration = (name: string) => {
  const [result, reexecuteQuery] = useQuery({
    query: RegistrationQuery,
    variables: { name },
    pause: name.length < 3,
  });

  const { data, error, fetching } = result;

  return {
    data,
    error,
    fetching,
    isRegistered: data ? data.registrations.length > 0 : null,
  };
};
