import { storeClicks } from "@/db/apiClicks";
import { getLongUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RedirectLink = () => {
  const { id } = useParams();
  const { loading, data, fn } = useFetch(getLongUrl);

  useEffect(() => {
    fn(id); // fetch the long URL based on short/custom URL
  }, [id]);

 useEffect(() => {
  if (!loading && data) {
    console.log("Fetched redirect data:", data); //  Add this

    const doRedirect = async () => {
      await storeClicks({
        id: data.id,
        originalUrl: data.original_url,
      });

      window.location.href = data.original_url; // Important: this line was missing
    };

    doRedirect();
  } else if (!loading && !data) {
    console.error("No data found for redirect."); //  Fallback
  }
}, [loading, data]);


  if (loading) {
    return (
      <>
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
        Redirecting...
      </>
    );
  }

  return null;
};

export default RedirectLink;
