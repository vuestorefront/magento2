import gql from 'graphql-tag';

export default gql`
mutation requestPasswordResetEmail($email: String!){
    requestPasswordResetEmail(email: $email)
}
`;
