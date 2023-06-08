import React, { useContext } from "react";
import EditForm from "../../Components/Forms/EditForm";
import { UserContext } from "../../Context/UserContext";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($user: BaseUserInput!, $id: String!) {
    updateUser(user: $user, _id: $id) {
      _id
      email
      firstName
      lastName
      password
      roles
      avatar
      age
      address
      phone
    }
  }
`;

const EditPage = () => {
  const { currentUser } = useContext(UserContext);
  const [updateUser] = useMutation(UPDATE_USER_MUTATION);

  const handleSubmit = async (values) => {
    const { firstName, lastName, address, phone, age, avatar, password } =
      values;

    try {
      await updateUser({
        variables: {
          user: {
            firstName,
            lastName,
            address,
            phone,
            age,
            avatar,
            password,
          },
          id: currentUser._id,
        },
      });

      console.log("User updated successfully");
      // Handle success or any further logic after successful update
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle any error that occurred during update
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <EditForm user={currentUser} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditPage;
