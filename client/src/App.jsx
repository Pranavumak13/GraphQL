import {ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import DisplayData from './DisplayData'
import DisplayMutationData from './DisplayMutationData'

function App() {

  const client = new ApolloClient({
   uri:"http://localhost:4000/graphql",   // uri specifies the URL of our GraphQL server.
   cache: new InMemoryCache()   //cache is an instance of InMemoryCache, which Apollo Client uses to cache query results after fetching them.
  })

  return (  
  <ApolloProvider client={client}>
      <div className='App'>
        <DisplayMutationData/>
        <DisplayData />
      </div>
  </ApolloProvider>
  )
}

export default App
