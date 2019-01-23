import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../layout'
import PostListing from '../components/PostListing/PostListing'
import config from '../../data/SiteConfig'

export default class CategoryTemplate extends React.Component {
  render () {
    const { pageContext, data } = this.props
    return (
      <Layout pageContext={pageContext} data={data}>
        <div className='category-container'>
          <Helmet>
            <title>
              {`Posts in category "${pageContext.category}" | ${
                config.siteTitle
              }`}
            </title>
            <body className='w-100 sans-serif pa0 near-black' />
          </Helmet>
          <div className='flex'>
            <div className='w-100 flex justify-center b--moon-gray'>
              <div className='w-100 mw7 pa3'>
                <h1>Post categories</h1>
                <PostListing postEdges={data.allMarkdownRemark.edges} />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
          }
        }
      }
    }
    nav: allSiteNavJson {
      edges {
        node {
          slug
          title
          subnodes {
            node {
              slug
              title
            }
          }
        }
      }
    }
  }
`
