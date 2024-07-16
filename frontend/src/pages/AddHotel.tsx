import { useMutation } from 'react-query'

import * as apiClient from '../api-client'
import { useAppContext } from '../context/AppContext'
import ManageHotelForm from '../forms/manage-hotel-form/ManageHotelForm'

const AddHotel = () => {
	const { showToast } = useAppContext()

	const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
		onSuccess: () => {
			showToast({ message: 'Hotel Saved!', type: 'SUCCESS' })
		},
		onError: () => {
			showToast({ message: 'Error Saving Hotel', type: 'ERROR' })
		},
	})

	const handleSave = (hotelFormData: FormData) => {
		mutate(hotelFormData)
	}

	return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
}

export default AddHotel
