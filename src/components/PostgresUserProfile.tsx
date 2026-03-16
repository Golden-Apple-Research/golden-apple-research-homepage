import { createQuery } from "@tanstack/solid-query";
import { getMyAccountData } from "~/routes/api/user-account"; // Pfad zur Server Function

export default function UserProfile() {
  const query = createQuery(() => ({
    queryKey: ["userAccount"],
    queryFn: () => getMyAccountData(), // Ruft die Server Function auf
  }));

  return (
    <div>
      <h1>Mein Profil</h1>
      {query.isLoading && <p>Lade Daten...</p>}
      {query.isError && <p>Fehler: {query.error.message}</p>}
      {/*{query.isSuccess && (
        <div>
          <p>Email: {query.data?.email}</p>
          <pre>{JSON.stringify(query.data?.accountData, null, 2)}</pre>
        </div>
      )}*/}
    </div>
  );
}
