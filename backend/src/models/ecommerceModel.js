const db = require('../config/db');

class EcommerceModel {
    static async createProduct(productData) {
        const { name, category, brand, ingredients, benefits, usage_instructions, certifications, prakriti_suitability, price, stock_quantity } = productData;
        const query = `
            INSERT INTO Products (name, category, brand, ingredients, benefits, usage_instructions, certifications, prakriti_suitability, price, stock_quantity)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *;
        `;
        const values = [name, category, brand, ingredients, benefits, usage_instructions, certifications, prakriti_suitability, price, stock_quantity];
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    static async placeOrder(orderData, items) {
        const client = await db.getClient();
        try {
            await client.query('BEGIN');

            const { patient_id, total_amount, discount_applied, shipping_address, payment_method } = orderData;
            const orderQuery = `
                INSERT INTO Orders (patient_id, total_amount, discount_applied, shipping_address, payment_method, order_status)
                VALUES ($1, $2, $3, $4, $5, 'Pending')
                RETURNING id;
            `;
            const orderValues = [patient_id, total_amount, discount_applied, shipping_address, payment_method];
            const orderResult = await client.query(orderQuery, orderValues);
            const orderId = orderResult.rows[0].id;

            const itemQuery = `
                INSERT INTO OrderItems (order_id, product_id, quantity, price_at_purchase)
                VALUES ($1, $2, $3, $4);
            `;
            for (let item of items) {
                await client.query(itemQuery, [orderId, item.product_id, item.quantity, item.price]);

                // Deduct stock
                await client.query(`UPDATE Products SET stock_quantity = stock_quantity - $1 WHERE id = $2`, [item.quantity, item.product_id]);
            }

            await client.query('COMMIT');
            return { orderId };
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    static async toggleWishlist(patientId, productId) {
        const checkQuery = `SELECT * FROM Wishlists WHERE patient_id = $1 AND product_id = $2;`;
        const { rowCount } = await db.query(checkQuery, [patientId, productId]);

        if (rowCount > 0) {
            await db.query(`DELETE FROM Wishlists WHERE patient_id = $1 AND product_id = $2;`, [patientId, productId]);
            return { added: false };
        } else {
            await db.query(`INSERT INTO Wishlists (patient_id, product_id) VALUES ($1, $2);`, [patientId, productId]);
            return { added: true };
        }
    }

    static async createSubscription(subData) {
        const { patient_id, product_id, frequency, next_billing_date, status } = subData;
        const query = `
            INSERT INTO Subscriptions (patient_id, product_id, frequency, next_billing_date, status)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const { rows } = await db.query(query, [patient_id, product_id, frequency, next_billing_date, status]);
        return rows[0];
    }
}

module.exports = EcommerceModel;