/**
 * Alsat - Input Validation (express-validator)
 */
const { body, param, query, validationResult } = require('express-validator');

function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const msg = errors.array().map(e => e.msg).join('; ');
    return res.status(400).json({ error: msg });
  }
  next();
}

const loginRules = [
  body('email').trim().isEmail().withMessage('Geçerli e-posta gerekli'),
  body('password').notEmpty().withMessage('Şifre gerekli')
];

const registerRules = [
  body('email').trim().isEmail().withMessage('Geçerli e-posta gerekli'),
  body('name').optional().trim().isLength({ max: 100 }),
  body('password').isLength({ min: 6 }).withMessage('Şifre en az 6 karakter olmalı')
];

const changePasswordRules = [
  body('currentPassword').notEmpty().withMessage('Mevcut şifre gerekli'),
  body('newPassword').isLength({ min: 6 }).withMessage('Yeni şifre en az 6 karakter olmalı')
];

const createAdRules = [
  body('title').trim().notEmpty().withMessage('Başlık gerekli').isLength({ max: 500 }),
  body('price').isFloat({ min: 0 }).withMessage('Geçerli fiyat gerekli'),
  body('category').trim().notEmpty().withMessage('Kategori gerekli'),
  body('city').trim().notEmpty().withMessage('Şehir gerekli'),
  body('description').optional().trim().isLength({ max: 50000 })
];

const updateAdRules = [
  param('id').isInt({ min: 1 }).withMessage('Geçersiz ilan ID'),
  body('title').optional().trim().notEmpty().isLength({ max: 500 }),
  body('price').optional().isFloat({ min: 0 }),
  body('description').optional().trim().isLength({ max: 50000 })
];

const reportAdRules = [
  param('id').isInt({ min: 1 }).withMessage('Geçersiz ilan ID'),
  body('reason').optional().trim().isLength({ max: 200 })
];

const paginationRules = [
  query('page').optional().isInt({ min: 1 }).withMessage('Geçersiz sayfa'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit 1-100 arası olmalı')
];

module.exports = {
  handleValidation,
  loginRules,
  registerRules,
  changePasswordRules,
  createAdRules,
  updateAdRules,
  reportAdRules,
  paginationRules
};
