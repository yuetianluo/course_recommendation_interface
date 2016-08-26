
import sys
import collections
import gensim, logging
#logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)

pos1_courseNum=(sys.argv[1])
pos2_courseNum=(sys.argv[2])
pos3_courseNum=(sys.argv[3])
neg1_courseNum=(sys.argv[4])
neg2_courseNum=(sys.argv[5])
neg3_courseNum=(sys.argv[6])

pos = []
neg = []
if pos1_courseNum != '0':
	pos.append(pos1_courseNum)
if pos2_courseNum != '0':
	pos.append(pos2_courseNum)
if pos3_courseNum != '0':
	pos.append(pos3_courseNum)

if neg1_courseNum != '0':
	pos.append(neg1_courseNum)
if neg2_courseNum != '0':
	pos.append(neg2_courseNum)
if neg3_courseNum != '0':
	pos.append(neg3_courseNum)


# pos =sys.argv[1:4]
# neg = sys.argv[4:7]
# # print (pos2_courseNum)
# # print (pos1_courseNum)
# # print (pos)

# index = 0
# for pos_course in pos:
# 	if pos_course == '0':
# 		pos.pop(index)
# 	index = index +1

# index = 0
# for neg_course in neg:
# 	if neg_course == '0':
# 		neg.pop(index)
# 	index = index +1

# print (neg)
model = gensim.models.Word2Vec.load('course_word2vec')
x=[];
try:
	aimingcourse=model.most_similar(positive=pos,negative=neg)
	for course in aimingcourse:
		print(str(course[0]))
	for course in aimingcourse:
		print(str(course[1]))
except KeyError as e:
	print('Sorry, there is not sufficient records about this course, so we can not give you recommendation with strong confidence')
finally:
	pass


