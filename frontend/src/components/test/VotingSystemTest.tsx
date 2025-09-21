import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { PAYSTACK_CONFIG, VOTE_PACKAGES, APP_CONFIG } from '../../utils/env';
import votingService from '../../services/votingService';

const VotingSystemTest = () => {
  const [tests, setTests] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const testSuites = [
    {
      name: 'Environment Configuration',
      tests: [
        {
          name: 'Paystack Public Key',
          test: () => PAYSTACK_CONFIG.publicKey.startsWith('pk_'),
          description: 'Checks if Paystack public key is properly configured'
        },
        {
          name: 'API URL Configuration',
          test: () => APP_CONFIG.apiUrl.includes('api'),
          description: 'Validates API URL configuration'
        },
        {
          name: 'Vote Packages',
          test: () => VOTE_PACKAGES.length === 3,
          description: 'Ensures all vote packages are loaded'
        }
      ]
    },
    {
      name: 'Voting Service',
      tests: [
        {
          name: 'Vote Balance Retrieval',
          test: () => {
            const balance = votingService.getUserVoteBalance();
            return typeof balance === 'number';
          },
          description: 'Tests vote balance retrieval functionality'
        },
        {
          name: 'Vote Balance Update',
          test: () => {
            const initialBalance = votingService.getUserVoteBalance();
            votingService.addVotes(5);
            const newBalance = votingService.getUserVoteBalance();
            votingService.updateUserVoteBalance(initialBalance); // Reset
            return newBalance === initialBalance + 5;
          },
          description: 'Tests vote balance update mechanism'
        },
        {
          name: 'Contestant Votes Storage',
          test: () => {
            const votes = votingService.getContestantVotes();
            return typeof votes === 'object';
          },
          description: 'Validates contestant votes storage'
        }
      ]
    },
    {
      name: 'Toast Notifications',
      tests: [
        {
          name: 'Success Toast',
          test: () => {
            try {
              toast.success('Test success message');
              return true;
            } catch (error) {
              return false;
            }
          },
          description: 'Tests success notification functionality'
        },
        {
          name: 'Error Toast',
          test: () => {
            try {
              toast.error('Test error message');
              return true;
            } catch (error) {
              return false;
            }
          },
          description: 'Tests error notification functionality'
        },
        {
          name: 'Custom Toast',
          test: () => {
            try {
              toast('Custom message', { icon: '🧪' });
              return true;
            } catch (error) {
              return false;
            }
          },
          description: 'Tests custom notification functionality'
        }
      ]
    }
  ];

  const runTests = async () => {
    setIsRunning(true);
    const results = [];

    for (const suite of testSuites) {
      const suiteResults = {
        suiteName: suite.name,
        tests: []
      };

      for (const test of suite.tests) {
        try {
          const result = await test.test();
          suiteResults.tests.push({
            ...test,
            passed: result,
            error: null
          });
        } catch (error) {
          suiteResults.tests.push({
            ...test,
            passed: false,
            error: error.message
          });
        }
        
        // Small delay between tests
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      results.push(suiteResults);
    }

    setTests(results);
    setIsRunning(false);

    // Show summary
    const totalTests = results.reduce((sum, suite) => sum + suite.tests.length, 0);
    const passedTests = results.reduce((sum, suite) => 
      sum + suite.tests.filter(test => test.passed).length, 0
    );

    if (passedTests === totalTests) {
      toast.success(`All ${totalTests} tests passed! 🎉`);
    } else {
      toast.error(`${passedTests}/${totalTests} tests passed`);
    }
  };

  useEffect(() => {
    // Auto-run tests on component mount
    runTests();
  }, []);

  const getTestIcon = (test) => {
    if (test.passed) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (test.error) return <XCircle className="w-5 h-5 text-red-500" />;
    return <AlertCircle className="w-5 h-5 text-yellow-500" />;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Voting System Test Suite 🧪
          </h2>
          <p className="text-gray-600">
            Comprehensive tests for the Nigerian Traditional Attire Contest voting system
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={runTests}
            disabled={isRunning}
            className="mt-4 bg-primary-green text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 flex items-center space-x-2 mx-auto"
          >
            {isRunning ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Running Tests...</span>
              </>
            ) : (
              <span>Run Tests Again</span>
            )}
          </motion.button>
        </div>

        {tests.length > 0 && (
          <div className="space-y-6">
            {tests.map((suite, suiteIndex) => (
              <motion.div
                key={suite.suiteName}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: suiteIndex * 0.1 }}
                className="border border-gray-200 rounded-lg p-4"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <span>{suite.suiteName}</span>
                  <div className="flex space-x-1">
                    {suite.tests.map((test, testIndex) => (
                      <div key={testIndex} className="w-2 h-2 rounded-full bg-gray-200">
                        {test.passed && <div className="w-full h-full bg-green-500 rounded-full" />}
                        {!test.passed && test.error && <div className="w-full h-full bg-red-500 rounded-full" />}
                      </div>
                    ))}
                  </div>
                </h3>

                <div className="space-y-3">
                  {suite.tests.map((test, testIndex) => (
                    <motion.div
                      key={test.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (suiteIndex * 0.1) + (testIndex * 0.05) }}
                      className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      {getTestIcon(test)}
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{test.name}</h4>
                        <p className="text-sm text-gray-600">{test.description}</p>
                        {test.error && (
                          <p className="text-sm text-red-600 mt-1">Error: {test.error}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Summary */}
            <div className="bg-gray-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Test Summary</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {tests.reduce((sum, suite) => sum + suite.tests.length, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Tests</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {tests.reduce((sum, suite) => 
                      sum + suite.tests.filter(test => test.passed).length, 0
                    )}
                  </div>
                  <div className="text-sm text-gray-600">Passed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">
                    {tests.reduce((sum, suite) => 
                      sum + suite.tests.filter(test => !test.passed).length, 0
                    )}
                  </div>
                  <div className="text-sm text-gray-600">Failed</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {isRunning && tests.length === 0 && (
          <div className="text-center py-8">
            <Loader className="w-12 h-12 animate-spin text-primary-green mx-auto mb-4" />
            <p className="text-gray-600">Running comprehensive tests...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VotingSystemTest;