import json
from pprint  import pprint
with open('student_grade_data.json') as student_data:
	data=json.load(student_data)

#pprint (data) #here you need a paratheness
with open('edw_enrollment_dict.json') as dictionary:
	course_dictionary=json.load(dictionary)
#pprint (course_dictionary) #here you need a paratheness

import collections
import gensim, logging
logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)

# courselist=[]
# for value in sampledata.values():
# 	orderstudent=collections.OrderedDict(sorted(value.items(),key=lambda t: t[0]))
# 	indcourse=[]
# 	for semester in orderstudent.values(): ##do not forget to add ':'
# 		semester=[str(i) for i in semester]####convert it to a string
# 		indcourse=indcourse+semester
# 	courselist.append(indcourse)

	
courselist=[]
for value in data.values():
	orderstudent=collections.OrderedDict(sorted(value.items(),key=lambda t: t[0]))
	indcourse=[]
	for semester in orderstudent.values(): ##do not forget to add ':'
		semester=[str(i) for i in semester]####convert it to a string
		indcourse=indcourse+semester
	courselist.append(indcourse)



model=gensim.models.Word2Vec(courselist,size=32,window=5,sg=1,min_count=1,workers=20)


#print ([1,2])
print([1,2])
