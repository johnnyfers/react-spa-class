import QuoteForm from '../components/quotes/QuoteForm'
import { useHistory } from 'react-router-dom'
import useHttp from '../hooks/use-http'
import { addQuote } from '../lib/api'
import { useEffect } from 'react'

export default function NewQuote() {
    const { sendRequest, status } = useHttp(addQuote)
    const history = useHistory()

    useEffect(()=>{
        if(status === 'complete') {
            history.push('/quotes')
        }
    },[history, status])

    const addQuoteHandler = (quoteData) => {
        sendRequest(quoteData)
    }

    return <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler}></QuoteForm>


}