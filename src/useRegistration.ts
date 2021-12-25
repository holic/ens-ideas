import { useQuery, gql } from "urql";
import { DateTime } from "luxon";

// TODO: figure out how to generate/extract types from this query

const RegistrationQuery = gql`
  query RegistrationQuery($name: String!, $earliestExpiry: Int!) {
    registrations(
      where: { labelName: $name, expiryDate_gt: $earliestExpiry }
      first: 1
    ) {
      labelName
      registrationDate
      expiryDate
    }
  }
`;

export const useRegistration = (name: string) => {
  const isValid = name.length >= 3;

  // Registrations subgraph includes expired domains, but we can filter them out
  // with an `expiryDate` filter to account for the 90 day grace period.
  const earliestExpiry = Math.floor(
    DateTime.now().minus({ days: 90 }).toSeconds()
  );

  const [result, reexecuteQuery] = useQuery({
    query: RegistrationQuery,
    variables: { name, earliestExpiry },
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
