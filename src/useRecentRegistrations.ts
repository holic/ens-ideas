import { DateTime } from "luxon";
import { useQuery, gql } from "urql";
import { useEffect } from "react";

// TODO: figure out how to generate/extract types from this query

const RecentRegistrationsQuery = gql`
  query RecentRegistrationsQuery {
    registrations(first: 20, orderBy: registrationDate, orderDirection: desc) {
      registrationDate
      domain {
        name
      }
    }
  }
`;

type Registration = {
  name: string;
  date: DateTime;
};

export const useRecentRegistrations = (): Registration[] => {
  const [result, reexecuteQuery] = useQuery({
    query: RecentRegistrationsQuery,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      reexecuteQuery({ requestPolicy: "network-only" });
    }, 1000 * 5);
    return () => clearInterval(timer);
  }, [reexecuteQuery]);

  return (
    result.data?.registrations.map((registration: any) => ({
      name: registration.domain.name,
      date: DateTime.fromSeconds(+registration.registrationDate),
    })) || []
  );
};
