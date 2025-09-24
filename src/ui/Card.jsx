
import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ title, children }) => {
    return (
        <div style={styles.card}>
            {title && <h3 style={styles.title}>{title}</h3>}
            <div>{children}</div>
        </div>
    );
};

const styles = {
    card: {
        padding: '1rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        backgroundColor: '#fff',
        maxWidth: '100%',
    },
    title: {
        marginTop: 0,
        marginBottom: '0.5rem',
        fontSize: '1.25rem',
    },
};

Card.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default Card;
