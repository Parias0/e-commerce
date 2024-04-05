import React from "react";
import { Accordion, Table } from "react-bootstrap";
import { useOrder } from "../../context/OrderContext";

const UserOrders = () => {
	const { userOrders } = useOrder()

	return (
		<div>
			<h3>My Orders</h3>
			<Accordion>
				{userOrders.map((order, index) => (
					<Accordion.Item key={order.id} eventKey={`${order.id}-${index}`}>
						<Accordion.Header className='accordion-header'>
							<div className='accordion-header-item'>Order {index + 1}</div>
							<div className='accordion-header-item'>
								Date: {new Date(order.orderDate).toLocaleDateString()}
							</div>
							<div className='accordion-header-item'>
								{order.totalAmount} PLN
							</div>
							<div className='accordion-header-item'>{order.status}</div>
						</Accordion.Header>
						<Accordion.Body>
							<h5>Products:</h5>
							<ul>
								{order.products.map(product => (
									<li key={product.productId}>
										{product.productName} (Quantity: {product.quantity}, Prize:{" "}
										{product.price} USD)
									</li>
								))}
							</ul>
							<h5>Contact Details:</h5>
							<Table striped bordered hover size='sm'>
								<tbody>
									<tr>
										<td>First Name nad Last Name</td>
										<td>
											{order.contactDetails.firstName}{" "}
											{order.contactDetails.lastName}
										</td>
									</tr>
									<tr>
										<td>Phone Number</td>
										<td>{order.contactDetails.mobilePhone}</td>
									</tr>
								</tbody>
							</Table>
						</Accordion.Body>
					</Accordion.Item>
				))}
			</Accordion>
			{userOrders.length === 0 && <p>Nie masz jeszcze żadnych zamówień.</p>}
		</div>
	)
}

export default UserOrders
