import { Button, ModalBody, ModalFooter, ModalHeader } from "@carbon/react"
import React from "react"
import { InlineLoading } from '@carbon/react';
import { useTranslation } from "react-i18next";
import { usePatient } from "../patient-getter/patient-getter.resource";


const BillDetailsModal = (props: { onClose, data }) => {
	const { t } = useTranslation();
	const patientName = "perera";
	const { isLoading, patient } = usePatient(patientName);

	return (
		<React.Fragment>
			<ModalHeader closeModal={props.onClose}>
				<span>Bill details</span>
			</ModalHeader>

			<ModalBody>
				{isLoading ? <InlineLoading description={t('loading', 'Loading') + '...'} role="progressbar" /> : null}
				{patient ?
					<span>Patient name: {patient.name[0].given}</span> :
					<></>
				}
				{!isLoading && !patient && <span>No Patient found</span>}
			</ModalBody>

			<ModalFooter>
				<Button onClick={props.onClose} kind="primary">
					Save
				</Button>
				<Button onClick={props.onClose} kind="danger">
					Close
				</Button>
			</ModalFooter>
		</React.Fragment>
	)
}


export default BillDetailsModal;