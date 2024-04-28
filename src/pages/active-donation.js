import { ActiveDonationLayout } from "@/page-components/layouts";
import ItemList from "@/page-components/components/ItemList/ItemList";
import { jwtDecode } from "jwt-decode"; // Import jwt_decode library
import axios from "axios"; // Import axios for HTTP requests

const ActiveDonationIndex = ({ userId }) => {
  return <ItemList userId={userId} />;
};

ActiveDonationIndex.Layout = ActiveDonationLayout;

export default ActiveDonationIndex;

export async function getServerSideProps(context) {
  // Fetch the token from context
  const token = context.req.cookies.token;

  // Decode the token to get user information
  const decodedToken = jwtDecode(token);

  // Extract userId from decoded token
  const userId = decodedToken.id;

  // Pass userId as props to the component
  return {
    props: {
      userId,
    },
  };
}
