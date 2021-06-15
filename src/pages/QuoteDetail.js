
import { useEffect } from 'react'
import { Link, Route, useParams, useRouteMatch } from 'react-router-dom'
import Comments from '../components/comments/Comments'
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import useHttp from '../hooks/use-http'
import {getSingleQuote} from '../lib/api'

export default function QuoteDetail() {
    const params = useParams()

    const match = useRouteMatch()

    const {sendRequest, status, data: quote, error} = useHttp(getSingleQuote, true)

    useEffect(()=>{
        sendRequest(params.quoteId)
    },[params.quoteId, sendRequest])

    if(status === 'pending') {
        return (
            <div className='centered'>
                <LoadingSpinner/>
            </div>
        )
    }

    if(error){
        return <p>{error}</p>
    }

    if (!quote.text) {
        return <p>No quote found</p>
    }

    return (
        <>
            <HighlightedQuote text={quote.text} author={quote.author} />

            <Route path={match.path} exact>
                <div className="centered">
                    <Link className="btn--flat" to={`${match.url}/comments`}>Load Comments</Link>
                </div>
            </Route>

            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </>
    )
}