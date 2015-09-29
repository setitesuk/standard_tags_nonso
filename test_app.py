"""

"""

import unittest
from selenium import webdriver
from time import sleep
from selenium.webdriver.common.keys import Keys


class AcceptanceTests(unittest.TestCase):
    

    def setUp(self):
        self.browser = webdriver.Firefox()
        self.browser.implicitly_wait(3)

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
        tags = self.browser.find_elements_by_id('tag-type')
        self.assertEqual(len(tags), 10)
        # Check that the first three are Clone Information
        clone_info = ['Clone Information' for dummy in range(3)]
        first_three = [tag.text for tag in tags[:3]]
        self.assertEqual(clone_info, first_three)
        search_box = self.browser.find_element_by_id('search-text')

        # Find search box and input text specific to the end tag
        search_box.send_keys("end of")
        
        # Confirm that only one tag is returned
        refreshed_tags = self.browser.find_elements_by_id('tag-type')
        self.assertEqual(len(refreshed_tags), 1)

        # Check that the tag returned is indeed the end tag
        end_tag = self.browser.find_element_by_id('tag-text')
        expected_text = "This is the end of sequence clone Dolly."
        self.assertEqual(end_tag.text, expected_text)
        end_tag.send_keys(Keys.COMMAND, 'a')
        sleep(2)
        # end_tag.send_keys(Keys.ARROW_DOWN)
        end_tag.send_keys(Keys.COMMAND, 'c')
        paste_target = self.browser.find_element_by_id('paste-content')
        paste_target.clear()
        paste_target.send_keys(Keys.COMMAND, 'v')
        sleep(4)

        self.assertIn(expected_text, paste_target.text.strip())
        



if __name__ == '__main__':
    unittest.main()
