import jwt from 'jsonwebtoken';

const generateJwtToken = ({ username, role }: { username: string, role:string }) => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'group22' };
    try {
        return jwt.sign({ username, role }, process.env.JWT_SECRET, options);
    } catch (error) {
        console.log(error);
        throw new Error('error signing jwt token');
    }
};

export { generateJwtToken };
