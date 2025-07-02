const bcrypt = require('bcryptjs');

// Gerar hash da senha admin123
const password = 'admin123';
const hashedPassword = bcrypt.hashSync(password, 10);

console.log('🔐 Hash da senha "admin123":');
console.log(hashedPassword);

// Verificar se o hash funciona
const isValid = bcrypt.compareSync(password, hashedPassword);
console.log('✅ Hash válido:', isValid);

// Testar com o hash antigo
const oldHash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';
const isOldValid = bcrypt.compareSync(password, oldHash);
console.log('✅ Hash antigo válido:', isOldValid); 