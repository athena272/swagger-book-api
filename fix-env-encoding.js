#!/usr/bin/env node

/**
 * Script para verificar e corrigir o encoding do arquivo .env
 * 
 * Uso:
 *   node fix-env-encoding.js        # Verifica o encoding
 *   node fix-env-encoding.js --fix  # Corrige automaticamente
 */

const fs = require('fs');
const path = require('path');

const envPath = path.resolve(process.cwd(), '.env');
const shouldFix = process.argv.includes('--fix') || process.argv.includes('-f');

console.log('🔍 Verificando arquivo .env...\n');

// Verificar se o arquivo existe
if (!fs.existsSync(envPath)) {
  console.error('❌ Arquivo .env não encontrado!');
  process.exit(1);
}

// Ler o arquivo como UTF-8
let content;
try {
  content = fs.readFileSync(envPath, 'utf8');
} catch (error) {
  console.error('❌ Erro ao ler arquivo:', error.message);
  process.exit(1);
}

// Verificar se há bytes nulos (indicativo de UTF-16)
const hasNullBytes = content.includes('\u0000');
const hasBOM = content.charCodeAt(0) === 0xFEFF;

if (hasNullBytes || hasBOM) {
  console.log('⚠️  PROBLEMA DETECTADO:');
  console.log('   - Arquivo está em UTF-16 (Unicode)');
  console.log('   - O dotenv precisa de UTF-8\n');
  
  if (shouldFix) {
    console.log('🔧 Convertendo para UTF-8...');
    
    try {
      // Ler como UTF-16 LE e salvar como UTF-8
      const utf16Content = fs.readFileSync(envPath, 'utf16le');
      fs.writeFileSync(envPath, utf16Content, 'utf8');
      
      // Verificar se funcionou
      const dotenv = require('dotenv');
      dotenv.config();
      
      if (process.env.JWT_SECRET) {
        console.log('✅ Conversão realizada com sucesso!');
        console.log('✅ JWT_SECRET carregado corretamente.\n');
      } else {
        console.log('⚠️  Arquivo convertido, mas JWT_SECRET ainda não está disponível.');
        console.log('   Verifique se o arquivo .env tem a variável JWT_SECRET definida.\n');
      }
    } catch (error) {
      console.error('❌ Erro ao converter:', error.message);
      process.exit(1);
    }
  } else {
    console.log('💡 Para corrigir automaticamente, execute:');
    console.log('   node fix-env-encoding.js --fix\n');
    process.exit(1);
  }
} else {
  console.log('✅ Encoding OK: Arquivo está em UTF-8\n');
  
  // Testar se o dotenv consegue carregar
  const dotenv = require('dotenv');
  dotenv.config();
  
  if (process.env.JWT_SECRET) {
    console.log('✅ JWT_SECRET carregado com sucesso!');
    console.log(`   Valor (primeiros 15 chars): ${process.env.JWT_SECRET.substring(0, 15)}...\n`);
  } else {
    console.log('⚠️  JWT_SECRET não encontrado no arquivo .env');
    console.log('   Verifique se a variável está definida corretamente.\n');
  }
}
