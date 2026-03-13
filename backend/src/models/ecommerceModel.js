const db = require('../config/db');

class EcommerceModel {
    // ==========================================
    // PRODUCTS CATALOG
    // ==========================================

    static async getProducts(filters = {}) {
        let query = `SELECT * FROM Products WHERE stock_quantity > 0`;
        const values = [];

        if (filters.category) {
            values.push(filters.category);
            query += ` AND category = $${values.length}`;
        }
        if (filters.search) {
            values.push(`%${filters.search}%`);
            query += ` AND (name ILIKE $${values.length} OR tags::text ILIKE $${values.length})`;
        }

        query += ` ORDER BY name ASC;`;
        const { rows } = await db.query(query, values);
        return rows;
    }

    static async getProductById(productId) {
        const query = `SELECT * FROM Products WHERE id = $1;`;
        const { rows } = await db.query(query, [productId]);
        return rows[0];
    }

    static async createProduct(productData) {
        const {
            name, sku, brand, category, form, quantity_size,
            mrp, price, gst_percent, hsn_code,
            shelf_life, storage_instructions, certifications, origin,
            target_audience, tags, description, key_ingredients,
            therapeutic_indications, dosage_administration, contraindications,
            stock_quantity
        } = productData;

        const query = `
            INSERT INTO Products (
                name, sku, brand, category, form, quantity_size, 
                mrp, price, gst_percent, hsn_code, 
                shelf_life, storage_instructions, certifications, origin, 
                target_audience, tags, description, key_ingredients, 
                therapeutic_indications, dosage_administration, contraindications, 
                stock_quantity
            )
            VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
                $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22
            )
            RETURNING *;
        `;

        const values = [
            name, sku, brand, category, form, quantity_size,
            mrp, price, gst_percent, hsn_code,
            shelf_life, storage_instructions, certifications, origin,
            target_audience,
            tags ? tags : null, // Postgres handles arrays cleanly if passed properly or stringified depending on pg-pool setup
            description,
            key_ingredients ? key_ingredients : null,
            therapeutic_indications ? therapeutic_indications : null,
            dosage_administration, contraindications,
            stock_quantity || 0
        ];

        const { rows } = await db.query(query, values);
        return rows[0];
    }

    // ==========================================
    // WISHLIST MANAGEMENT
    // ==========================================

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

    static async getWishlist(patientId) {
        const query = `
            SELECT p.* FROM Products p
            JOIN Wishlists w ON p.id = w.product_id
            WHERE w.patient_id = $1;
        `;
        const { rows } = await db.query(query, [patientId]);
        return rows;
    }

    // ==========================================
    // ORDERS & TRANSACTIONS
    // ==========================================

    static async placeOrder(orderData, items) {
        const client = await db.getClient();
        try {
            await client.query('BEGIN');

            const { patient_id, total_amount, discount_applied, shipping_address, payment_method } = orderData;

            const orderQuery = `
                INSERT INTO Orders (patient_id, total_amount, discount_applied, shipping_address, payment_method, payment_status, order_status)
                VALUES ($1, $2, $3, $4, $5, 'Pending', 'Processing')
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
                const stockCheck = await client.query(`SELECT stock_quantity FROM Products WHERE id = $1 FOR UPDATE`, [item.product_id]);
                if (stockCheck.rows[0].stock_quantity < item.quantity) {
                    throw new Error(`Insufficient stock for product ID: ${item.product_id}`);
                }

                await client.query(itemQuery, [orderId, item.product_id, item.quantity, item.price]);
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

    static async getUserOrders(patientId) {
        const query = `SELECT * FROM Orders WHERE patient_id = $1 ORDER BY created_at DESC;`;
        const { rows } = await db.query(query, [patientId]);
        return rows;
    }

    static async updatePaymentStatus(orderId, status) {
        const query = `UPDATE Orders SET payment_status = $1 WHERE id = $2 RETURNING *;`;
        const { rows } = await db.query(query, [status, orderId]);
        return rows[0];
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