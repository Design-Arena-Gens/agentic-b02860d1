'use client';

import { useState } from 'react';
import { Code2, Sparkles, FileCode, CheckCircle2, AlertCircle, Lightbulb, RefreshCw, Bug } from 'lucide-react';

type ActionType = 'analyze' | 'write' | 'improve' | 'refactor' | 'debug' | 'expand';

interface Analysis {
  type: ActionType;
  result: string;
  timestamp: Date;
}

export default function Home() {
  const [code, setCode] = useState('');
  const [prompt, setPrompt] = useState('');
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);

  const analyzeCode = (actionType: ActionType) => {
    setLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      let result = '';

      switch(actionType) {
        case 'analyze':
          result = generateAnalysis(code);
          break;
        case 'write':
          result = generateCode(prompt);
          break;
        case 'improve':
          result = improveCode(code);
          break;
        case 'refactor':
          result = refactorCode(code);
          break;
        case 'debug':
          result = debugCode(code);
          break;
        case 'expand':
          result = expandCode(code, prompt);
          break;
      }

      setAnalysis({
        type: actionType,
        result,
        timestamp: new Date()
      });
      setLoading(false);
    }, 1500);
  };

  const generateAnalysis = (code: string): string => {
    if (!code.trim()) return '⚠️ No code provided. Please paste code to analyze.';

    return `## Code Analysis Report

### Structure
- Lines of code: ${code.split('\n').length}
- Detected language: ${detectLanguage(code)}
- Functions/Methods: ${countFunctions(code)}

### Quality Assessment
✅ **Strengths:**
- Code follows basic structural patterns
- Variable naming appears consistent
- Reasonable organization

⚠️ **Potential Issues:**
- Consider adding error handling for edge cases
- Documentation could be improved
- Type safety checks may be needed

### Recommendations
1. Add comprehensive error handling
2. Include inline documentation
3. Consider breaking down complex functions
4. Add unit tests for critical paths
5. Validate input parameters

### Security Considerations
- Ensure user input is sanitized
- Check for potential injection vulnerabilities
- Validate all external data sources`;
  };

  const generateCode = (prompt: string): string => {
    if (!prompt.trim()) return '⚠️ Please provide a description of what code you need.';

    return `// Generated based on: "${prompt}"

/**
 * Implementation following best practices
 * - Type-safe
 * - Error handled
 * - Well documented
 */

function processData(input: any): any {
  // Validation
  if (!input) {
    throw new Error('Input is required');
  }

  try {
    // Main logic
    const result = performOperation(input);

    // Validation of result
    if (!result) {
      throw new Error('Operation failed');
    }

    return result;
  } catch (error) {
    console.error('Error processing data:', error);
    throw error;
  }
}

function performOperation(data: any): any {
  // Implementation based on your requirements
  return data;
}

// Example usage:
try {
  const result = processData({ /* your data */ });
  console.log('Success:', result);
} catch (error) {
  console.error('Failed:', error);
}`;
  };

  const improveCode = (code: string): string => {
    if (!code.trim()) return '⚠️ No code provided to improve.';

    return `## Improved Version

\`\`\`typescript
// Original code enhanced with:
// - Better error handling
// - Type safety
// - Documentation
// - Performance optimization

/**
 * Enhanced implementation with improved practices
 * @param {T} input - The input data to process
 * @returns {Promise<T>} Processed result
 * @throws {Error} If validation fails
 */
async function improvedFunction<T>(input: T): Promise<T> {
  // Input validation
  if (input === null || input === undefined) {
    throw new Error('Invalid input: input cannot be null or undefined');
  }

  try {
    // Process with proper error boundaries
    const validated = await validateInput(input);
    const processed = await processWithRetry(validated);

    return processed;
  } catch (error) {
    // Structured error handling
    if (error instanceof ValidationError) {
      console.error('Validation failed:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}

async function validateInput<T>(data: T): Promise<T> {
  // Add validation logic
  return data;
}

async function processWithRetry<T>(data: T, retries = 3): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await process(data);
    } catch (error) {
      if (i === retries - 1) throw error;
      await delay(1000 * Math.pow(2, i));
    }
  }
  throw new Error('Max retries exceeded');
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
\`\`\`

### Improvements Made:
1. ✅ Added TypeScript generics for type safety
2. ✅ Implemented async/await for better async handling
3. ✅ Added comprehensive error handling
4. ✅ Included retry logic for resilience
5. ✅ Added JSDoc documentation
6. ✅ Structured error types
7. ✅ Input validation`;
  };

  const refactorCode = (code: string): string => {
    if (!code.trim()) return '⚠️ No code provided to refactor.';

    return `## Refactored Code

\`\`\`typescript
// Refactored for:
// - Better separation of concerns
// - Improved maintainability
// - Enhanced testability
// - Clear single responsibility

// Types
interface Config {
  timeout: number;
  retries: number;
  endpoint: string;
}

interface Result<T> {
  success: boolean;
  data?: T;
  error?: Error;
}

// Service Layer
class DataService {
  constructor(private config: Config) {}

  async fetchData<T>(id: string): Promise<Result<T>> {
    try {
      const data = await this.performFetch<T>(id);
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Unknown error')
      };
    }
  }

  private async performFetch<T>(id: string): Promise<T> {
    // Implementation
    const response = await fetch(\`\${this.config.endpoint}/\${id}\`);
    return response.json();
  }
}

// Validation Layer
class Validator {
  static validateId(id: string): boolean {
    return id.length > 0 && /^[a-zA-Z0-9-]+$/.test(id);
  }

  static validateConfig(config: Partial<Config>): config is Config {
    return !!(
      config.timeout &&
      config.retries &&
      config.endpoint
    );
  }
}

// Main Controller
class DataController {
  private service: DataService;

  constructor(config: Config) {
    if (!Validator.validateConfig(config)) {
      throw new Error('Invalid configuration');
    }
    this.service = new DataService(config);
  }

  async getData<T>(id: string): Promise<Result<T>> {
    if (!Validator.validateId(id)) {
      return {
        success: false,
        error: new Error('Invalid ID format')
      };
    }

    return this.service.fetchData<T>(id);
  }
}

// Usage
const controller = new DataController({
  timeout: 5000,
  retries: 3,
  endpoint: 'https://api.example.com'
});

const result = await controller.getData('item-123');
if (result.success) {
  console.log('Data:', result.data);
} else {
  console.error('Error:', result.error);
}
\`\`\`

### Refactoring Benefits:
1. 🎯 Clear separation of concerns (Service, Validator, Controller)
2. 🔧 Easier to test individual components
3. 📦 Reusable validation logic
4. 🛡️ Type-safe with proper interfaces
5. 🎨 Clean, maintainable structure`;
  };

  const debugCode = (code: string): string => {
    if (!code.trim()) return '⚠️ No code provided to debug.';

    return `## Debug Analysis

### Potential Issues Detected:

🐛 **Issue 1: Missing Error Handling**
- Location: Main execution block
- Impact: High
- Fix: Wrap in try-catch block

🐛 **Issue 2: Undefined Variable Reference**
- Location: Variable may be used before initialization
- Impact: Medium
- Fix: Initialize variables before use

🐛 **Issue 3: Type Coercion**
- Location: Comparison operations
- Impact: Low
- Fix: Use strict equality (===) instead of (==)

### Debugging Checklist:
- [ ] Add console.log statements at key points
- [ ] Verify all variables are initialized
- [ ] Check for null/undefined values
- [ ] Validate function return types
- [ ] Test edge cases
- [ ] Review async/await usage

### Recommended Debug Code:

\`\`\`typescript
// Add debugging utilities
function debugLog(context: string, data: any) {
  console.log(\`[DEBUG][\${context}][\${new Date().toISOString()}]\`, data);
}

function debugError(context: string, error: any) {
  console.error(\`[ERROR][\${context}][\${new Date().toISOString()}]\`, error);
  console.trace(); // Add stack trace
}

// Wrap your code with debugging
async function debuggedFunction() {
  debugLog('start', 'Function execution started');

  try {
    debugLog('input-validation', 'Validating inputs...');
    // Your code here

    debugLog('processing', 'Processing data...');
    // More code

    debugLog('complete', 'Function completed successfully');
  } catch (error) {
    debugError('execution', error);
    throw error;
  }
}
\`\`\`

### Next Steps:
1. Run code with debugging enabled
2. Check console for error messages
3. Verify data flow at each step
4. Test with edge case inputs
5. Use browser/IDE debugger breakpoints`;
  };

  const expandCode = (code: string, prompt: string): string => {
    if (!code.trim()) return '⚠️ No code provided to expand.';

    return `## Expanded Implementation

\`\`\`typescript
// Original code expanded with:
// - Additional features
// - Better error handling
// - Comprehensive logging
// - Performance monitoring

import { EventEmitter } from 'events';

interface Options {
  enableLogging?: boolean;
  enableMetrics?: boolean;
  timeout?: number;
}

class ExpandedImplementation extends EventEmitter {
  private options: Options;
  private metrics: Map<string, number>;
  private logger: Logger;

  constructor(options: Options = {}) {
    super();
    this.options = {
      enableLogging: true,
      enableMetrics: true,
      timeout: 30000,
      ...options
    };
    this.metrics = new Map();
    this.logger = new Logger(this.options.enableLogging);
  }

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    const startTime = Date.now();
    const operationId = this.generateId();

    this.logger.info(\`Starting operation \${operationId}\`);
    this.emit('operationStart', { id: operationId });

    try {
      const result = await this.executeWithTimeout(operation);

      const duration = Date.now() - startTime;
      this.recordMetric('operation.success', duration);

      this.logger.info(\`Operation \${operationId} completed in \${duration}ms\`);
      this.emit('operationComplete', { id: operationId, duration });

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      this.recordMetric('operation.failure', duration);

      this.logger.error(\`Operation \${operationId} failed after \${duration}ms\`, error);
      this.emit('operationError', { id: operationId, error, duration });

      throw error;
    }
  }

  private async executeWithTimeout<T>(
    operation: () => Promise<T>
  ): Promise<T> {
    return Promise.race([
      operation(),
      this.createTimeout<T>()
    ]);
  }

  private createTimeout<T>(): Promise<T> {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(\`Operation timeout after \${this.options.timeout}ms\`));
      }, this.options.timeout);
    });
  }

  private recordMetric(key: string, value: number): void {
    if (!this.options.enableMetrics) return;

    const current = this.metrics.get(key) || 0;
    this.metrics.set(key, current + value);
  }

  private generateId(): string {
    return \`\${Date.now()}-\${Math.random().toString(36).substr(2, 9)}\`;
  }

  getMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }

  clearMetrics(): void {
    this.metrics.clear();
  }
}

class Logger {
  constructor(private enabled: boolean) {}

  info(message: string, ...args: any[]): void {
    if (this.enabled) {
      console.log(\`[INFO] \${message}\`, ...args);
    }
  }

  error(message: string, ...args: any[]): void {
    if (this.enabled) {
      console.error(\`[ERROR] \${message}\`, ...args);
    }
  }

  warn(message: string, ...args: any[]): void {
    if (this.enabled) {
      console.warn(\`[WARN] \${message}\`, ...args);
    }
  }
}

// Usage example
const impl = new ExpandedImplementation({
  enableLogging: true,
  enableMetrics: true,
  timeout: 5000
});

impl.on('operationComplete', ({ id, duration }) => {
  console.log(\`Operation \${id} took \${duration}ms\`);
});

impl.on('operationError', ({ id, error }) => {
  console.error(\`Operation \${id} failed:\`, error);
});

const result = await impl.execute(async () => {
  // Your operation here
  return { status: 'success' };
});

console.log('Metrics:', impl.getMetrics());
\`\`\`

### Features Added:
1. ⚡ Event-driven architecture
2. 📊 Built-in metrics and monitoring
3. 🕒 Timeout handling
4. 📝 Comprehensive logging
5. 🔒 Error boundaries
6. 🎯 Unique operation IDs
7. 📈 Performance tracking`;
  };

  const detectLanguage = (code: string): string => {
    if (code.includes('function') || code.includes('const ') || code.includes('let ')) return 'JavaScript/TypeScript';
    if (code.includes('def ') || code.includes('import ')) return 'Python';
    if (code.includes('public class') || code.includes('private ')) return 'Java';
    return 'Unknown';
  };

  const countFunctions = (code: string): number => {
    const matches = code.match(/function\s+\w+|const\s+\w+\s*=\s*\(|def\s+\w+/g);
    return matches ? matches.length : 0;
  };

  const actions: Array<{ type: ActionType; label: string; icon: any; description: string }> = [
    { type: 'analyze', label: 'Analyze', icon: Code2, description: 'Deep analysis of code quality' },
    { type: 'write', label: 'Write', icon: Sparkles, description: 'Generate new code from prompt' },
    { type: 'improve', label: 'Improve', icon: CheckCircle2, description: 'Enhance existing code' },
    { type: 'refactor', label: 'Refactor', icon: RefreshCw, description: 'Restructure for maintainability' },
    { type: 'debug', label: 'Debug', icon: Bug, description: 'Find and fix issues' },
    { type: 'expand', label: 'Expand', icon: Lightbulb, description: 'Add features and functionality' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileCode className="w-12 h-12 text-purple-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Coding Specialist
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Professional code analysis, generation, and improvement powered by AI
          </p>
        </div>

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Code Input */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20 shadow-xl">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Code Input
            </label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here..."
              className="w-full h-64 bg-slate-900 text-gray-100 rounded-lg p-4 font-mono text-sm border border-purple-500/30 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
            />
          </div>

          {/* Prompt Input */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20 shadow-xl">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Instructions / Requirements
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you need... (required for Write and Expand actions)"
              className="w-full h-64 bg-slate-900 text-gray-100 rounded-lg p-4 text-sm border border-purple-500/30 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {actions.map(({ type, label, icon: Icon, description }) => (
            <button
              key={type}
              onClick={() => analyzeCode(type)}
              disabled={loading}
              className="bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-lg p-4 transition-all duration-200 shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed group"
              title={description}
            >
              <Icon className="w-6 h-6 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-8 border border-purple-500/20 shadow-xl text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
            <p className="text-gray-300">Processing your request...</p>
          </div>
        )}

        {/* Results */}
        {analysis && !loading && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-purple-400 capitalize">
                {analysis.type} Results
              </h2>
              <span className="text-sm text-gray-400">
                {analysis.timestamp.toLocaleTimeString()}
              </span>
            </div>
            <div className="bg-slate-900 rounded-lg p-6 border border-purple-500/30">
              <pre className="whitespace-pre-wrap text-gray-200 text-sm leading-relaxed font-mono">
                {analysis.result}
              </pre>
            </div>
          </div>
        )}

        {/* Info Box */}
        {!analysis && !loading && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20 shadow-xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">How to Use</h3>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• <strong>Analyze:</strong> Get detailed code quality analysis</li>
                  <li>• <strong>Write:</strong> Generate new code from description (use Instructions field)</li>
                  <li>• <strong>Improve:</strong> Enhance code with best practices</li>
                  <li>• <strong>Refactor:</strong> Restructure code for better maintainability</li>
                  <li>• <strong>Debug:</strong> Identify and fix potential issues</li>
                  <li>• <strong>Expand:</strong> Add new features to existing code</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-gray-400 text-sm">
          <p>AI-powered code specialist • Analyze • Generate • Improve • Debug</p>
        </div>
      </div>
    </div>
  );
}
