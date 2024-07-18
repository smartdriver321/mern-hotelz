import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

import * as apiClient from '../api-client'
import { useSearchContext } from '../context/SearchContext'
import BookingForm from '../forms/booking-form/BookingForm'
import BookingDetailsSummary from '../components/BookingDetailsSummary'

const Booking = () => {
	const search = useSearchContext()
	const { hotelId } = useParams()
	const [numberOfNights, setNumberOfNights] = useState<number>(0)

	useEffect(() => {
		if (search.checkIn && search.checkOut) {
			const nights =
				Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
				(1000 * 60 * 60 * 24)

			setNumberOfNights(Math.ceil(nights))
		}
	}, [search.checkIn, search.checkOut])

	const { data: currentUser } = useQuery(
		'fetchCurrentUser',
		apiClient.fetchCurrentUser
	)

	const { data: hotel } = useQuery(
		'fetchHotelByID',
		() => apiClient.fetchHotelById(hotelId as string),
		{
			enabled: !!hotelId,
		}
	)

	if (!hotel) {
		return <></>
	}

	return (
		<div className='grid md:grid-cols-[1fr_2fr]'>
			<BookingDetailsSummary
				checkIn={search.checkIn}
				checkOut={search.checkOut}
				adultCount={search.adultCount}
				childCount={search.childCount}
				numberOfNights={numberOfNights}
				hotel={hotel}
			/>{' '}
			{currentUser && <BookingForm currentUser={currentUser} />}
		</div>
	)
}

export default Booking
