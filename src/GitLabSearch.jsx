import React, { useState } from 'react';
import { buildSchema, graphql } from 'graphql';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    createHttpLink,
    gql
  } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';



const GitLabSearch = () => {
    const [previousCurser, setPreviousCurser] = useState("")
    const [queryResults, setQueryResults] = useState([])
    const [searchParameters, setSearchParameters] = useState("")
    const token = "glpat-PoBNDC2_T6fyGTyjj4Dp";

    const handleChange = (event) => {
      setSearchParameters(event.target.value);
    }

    function getData() {
    
      const httpLink = createHttpLink({
        uri: 'https://gitlab.com/api/graphql',
      });
    
        const authLink = setContext((_, { headers }) => {

         return {
            headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
            }
         }
        });
    
        const client = new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache()
        });
    
      client
        .query({
          query: gql`
          query {
            projects(search: "${searchParameters}", after: "${previousCurser}", first: 20) {
              pageInfo{
                endCursor
              }
              nodes {
                name
                description
                archived
                createdAt
                fullPath
                projectMembers {
                  nodes {
                    user {
                      name
                    }
                  }
                }
              }
            }
          }
          `
        })
        .then(result => {
            setQueryResults(result.data.projects.nodes)
            setPreviousCurser(result.data.projects.pageInfo.endCursor)
        });
       }
  
   if (queryResults.length == 0){
  return (
    <header className= "header">
      <div>
    <h1 >Search through projects</h1>
      <label htmlFor="header-search">
      </label>
      <input
          type="text"
          id="header-search"
          placeholder="Search through projects"          
          value = {searchParameters}
          onChange={handleChange}
      />
      <button className="click" onClick={() => {getData()}}>Search</button>
      </div>

  </header>
   
  );
   }
   else{
    console.log(queryResults)
     return (
      <div className="tablePage">
      
     <table className="results">
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Created At</th>
        <th>Full Path</th>
        <th>Archived</th>
        <th>Project Members</th>

      </tr>
      {queryResults.map( result => 
      <tr>
        <td>{result.name}</td>
        <td>{result.description}</td>
        <td>{result.createdAt}</td>
        <td> <a href={"https://gitlab.com/" + result.fullPath}>{result.fullPath}</a></td>
        <td>{result.archived.toString()}</td>
        <td>{result.projectMembers.nodes.map(node => node.user.name).join()}</td>
        </tr>
      )}
     </table>
     
     <button className="clickResults" onClick={() => {getData()}}>See more</button>
       </div>
     )
   }
};

export default GitLabSearch;
