import gql from 'graphql-tag';

export default gql`
    query urlReslover($url: String!) {
        urlResolver(url:$url) {
            id,
            redirectCode,
            relative_url,
            type
        }
    }
`;
