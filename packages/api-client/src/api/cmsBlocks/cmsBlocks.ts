import gql from 'graphql-tag';

export default gql`
    query cmsBlock($identifiers: [String]) {
        cmsBlocks(identifiers: $identifiers) {
            items {
                content
                identifier
                title
            }
        }
    }`;
