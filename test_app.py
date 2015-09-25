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
        """
         We want to see the 3 Clone Information tags appearing first
        """ 
        # As sanity check confirm that we have title 
        self.browser.get('http://localhost:8000')
        self.assertIn('Annotation Tags', self.browser.title)
        
        # Check that we have tags 
        tags = self.browser.find_element_by_id('tag-type').text




if __name__ == '__main__':
    unittest.main()
