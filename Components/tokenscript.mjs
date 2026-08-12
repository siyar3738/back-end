
import jwt from 'jsonwebtoken';

function parseArgs() {
  const args = process.argv.slice(2);
  const out = {};
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = args[i + 1];
      if (next && !next.startsWith('--')) {
        out[key] = next;
        i++;
      } else {
        out[key] = true;
      }
    }
  }
  return out;
}

const opts = parseArgs();
const name = opts.name || 'User';
const email = opts.email || 'user@example.com';
const expires = opts.expires || '1h';
const secretKey = process.env.JWT_SECRET || opts.secret || 'your_secret_key';

const payload = { name, email };
const token = jwt.sign(payload, secretKey, { expiresIn: expires });

const decoded = jwt.decode(token);
let expStr = 'unknown';
if (decoded && decoded.exp) {
  const expDate = new Date(decoded.exp * 1000);
  expStr = expDate.toISOString() + ' (' + expDate.toLocaleString() + ')';
}
let iatStr = 'unknown';
if (decoded && decoded.iat) {
  const iatDate = new Date(decoded.iat * 1000);
  iatStr = iatDate.toISOString() + ' (' + iatDate.toLocaleString() + ')';
}

console.log('Generated JWT token:');
console.log(token);
console.log('');
console.log('Payload:', payload);
console.log('Issued at:', iatStr);
console.log('Expires at:', expStr);

if (opts.help) {
  console.log('\nUsage: node Components/tokenscript.mjs --name "Name" --email "a@b.com" --expires 1h --secret your_secret');
}
