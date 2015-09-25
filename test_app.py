"""

"""

import unittest
from selenium import webdriver


class AcceptanceTests(unittest.TestCase):
    

    def setUp(self):
        self.browser = webdriver.Firefox()

    def tearDown(self):
        self.browser.quit()

    def test_first_three_are_clone_information(self):
        # We want to see the 3 Clone Information tags appearing first
        self.browser.get('http://localhost:8000')
        self.assertIn('Annotation Tags', self.browser.title)





if __name__ == '__main__':
    unittest.main()
